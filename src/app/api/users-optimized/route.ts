import { NextResponse } from "next/server";
import { performanceMonitor } from "@/lib/performance-monitor";
import { 
  getUsersOptimized, 
  getUsersWithIndexes, 
  getUsersWithMaterializedView, 
  getUsersWithOptimizedJson 
} from "@/lib/optimized-queries";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const divisionFilter = url.searchParams.get("division");
  const queryType = url.searchParams.get("type") as 'before' | 'after' || 'after';
  const optimizationType = url.searchParams.get("optimization") || 'basic';

  try {
    let result;
    let queryName = '';

    switch (optimizationType) {
      case 'indexed':
        queryName = 'users_optimized_indexed';
        result = await performanceMonitor.measureExecution(
          queryName,
          queryType,
          async () => {
            return { rows: await getUsersWithIndexes(divisionFilter || undefined) };
          }
        );
        break;

      case 'materialized':
        queryName = 'users_optimized_materialized';
        result = await performanceMonitor.measureExecution(
          queryName,
          queryType,
          async () => {
            return { rows: await getUsersWithMaterializedView(divisionFilter || undefined) };
          }
        );
        break;

      case 'json':
        queryName = 'users_optimized_json';
        result = await performanceMonitor.measureExecution(
          queryName,
          queryType,
          async () => {
            return { rows: await getUsersWithOptimizedJson(divisionFilter || undefined) };
          }
        );
        break;

      default:
        queryName = 'users_optimized_basic';
        result = await performanceMonitor.measureExecution(
          queryName,
          queryType,
          async () => {
            return { rows: await getUsersOptimized(divisionFilter || undefined) };
          }
        );
        break;
    }

    // Process the optimized results
    const users = result.rows.map((user: any) => ({
      id: user.id,
      username: user.username,
      fullName: user.full_name,
      email: user.email,
      birthDate: user.birth_date,
      bio: user.bio,
      longBio: user.long_bio,
      profileJson: user.profile_json,
      address: user.address,
      phoneNumber: user.phone_number,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      role: user.role,
      division: user.division_name,
      // Additional optimized fields
      instagramHandle: user.instagram_handle,
      linkedinUrl: user.linkedin_url,
      hasProfile: user.has_profile,
      totalCount: user.total_count,
      rowNum: user.row_num,
      logCount: user.log_count,
      loginCount: user.login_count
    }));

    return NextResponse.json({
      users,
      total: users.length,
      optimizationType,
      queryName,
      filteredBy: divisionFilter || "all",
      message: `Optimized users query (${optimizationType}) executed successfully`,
    });
  } catch (error) {
    console.error("Optimized Users API error:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
} 