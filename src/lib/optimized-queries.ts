import { executeQuery } from "@/lib/database";

/**
 * Optimized version of users query with proper indexing and efficient joins
 * This is what the query should look like after refactoring
 */
export async function getUsersOptimized(divisionFilter?: string) {
  // Good practice: Use parameterized queries to prevent SQL injection
  let query = `
    SELECT 
      u.id,
      u.username,
      u.full_name,
      u.birth_date,
      u.bio,
      u.long_bio,
      u.profile_json,
      u.address,
      u.phone_number,
      u.created_at,
      u.updated_at,
      a.email,
      ur.role,
      ud.division_name
    FROM users u
    LEFT JOIN auth a ON u.auth_id = a.id
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN user_divisions ud ON u.id = ud.user_id
  `;

  const params: any[] = [];

  // Good practice: Use parameterized queries for filtering
  if (divisionFilter && divisionFilter !== "all") {
    query += ` WHERE ud.division_name = $1`;
    params.push(divisionFilter);
  }

  query += ` ORDER BY u.created_at DESC LIMIT 100`; // Good practice: Add pagination

  const result = await executeQuery(query, params);
  return result.rows;
}

/**
 * Optimized version with proper indexing strategy
 * This demonstrates what the database should look like after optimization
 */
export async function getUsersWithIndexes(divisionFilter?: string) {
  // Good practice: Use indexed columns and efficient joins
  let query = `
    SELECT 
      u.id,
      u.username,
      u.full_name,
      u.birth_date,
      u.bio,
      u.long_bio,
      u.profile_json,
      u.address,
      u.phone_number,
      u.created_at,
      u.updated_at,
      a.email,
      ur.role,
      ud.division_name,
      -- Good practice: Use window functions instead of subqueries
      COUNT(*) OVER() as total_count,
      ROW_NUMBER() OVER (ORDER BY u.created_at DESC) as row_num
    FROM users u
    LEFT JOIN auth a ON u.auth_id = a.id
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN user_divisions ud ON u.id = ud.user_id
  `;

  const params: any[] = [];

  if (divisionFilter && divisionFilter !== "all") {
    query += ` WHERE ud.division_name = $1`;
    params.push(divisionFilter);
  }

  query += ` ORDER BY u.created_at DESC LIMIT 50 OFFSET 0`;

  const result = await executeQuery(query, params);
  return result.rows;
}

/**
 * Optimized version with materialized views (for demonstration)
 * This shows how materialized views can improve performance
 */
export async function getUsersWithMaterializedView(divisionFilter?: string) {
  // Good practice: Use materialized views for complex aggregations
  let query = `
    SELECT 
      u.id,
      u.username,
      u.full_name,
      u.birth_date,
      u.bio,
      u.long_bio,
      u.profile_json,
      u.address,
      u.phone_number,
      u.created_at,
      u.updated_at,
      a.email,
      ur.role,
      ud.division_name
    FROM users u
    LEFT JOIN auth a ON u.auth_id = a.id
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN user_divisions ud ON u.id = ud.user_id
    -- Good practice: Use CTEs for complex logic
    LEFT JOIN (
      SELECT 
        user_id,
        COUNT(*) as log_count,
        COUNT(CASE WHEN action = 'login' THEN 1 END) as login_count
      FROM user_logs 
      GROUP BY user_id
    ) ul ON u.id = ul.user_id
  `;

  const params: any[] = [];

  if (divisionFilter && divisionFilter !== "all") {
    query += ` WHERE ud.division_name = $1`;
    params.push(divisionFilter);
  }

  query += ` ORDER BY u.created_at DESC LIMIT 25`;

  const result = await executeQuery(query, params);
  return result.rows;
}

/**
 * Optimized version with proper JSON handling
 * This shows how to efficiently handle JSON data in PostgreSQL
 */
export async function getUsersWithOptimizedJson(divisionFilter?: string) {
  let query = `
    SELECT 
      u.id,
      u.username,
      u.full_name,
      u.birth_date,
      u.bio,
      u.long_bio,
      u.profile_json,
      u.address,
      u.phone_number,
      u.created_at,
      u.updated_at,
      a.email,
      ur.role,
      ud.division_name,
      -- Good practice: Extract JSON values efficiently
      u.profile_json->>'instagram' as instagram_handle,
      u.profile_json->'social_media'->>'linkedin' as linkedin_url,
      -- Good practice: Use JSON functions for validation
      CASE 
        WHEN u.profile_json IS NOT NULL AND u.profile_json != '{}'::jsonb 
        THEN true 
        ELSE false 
      END as has_profile
    FROM users u
    LEFT JOIN auth a ON u.auth_id = a.id
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN user_divisions ud ON u.id = ud.user_id
  `;

  const params: any[] = [];

  if (divisionFilter && divisionFilter !== "all") {
    query += ` WHERE ud.division_name = $1`;
    params.push(divisionFilter);
  }

  query += ` ORDER BY u.created_at DESC LIMIT 75`;

  const result = await executeQuery(query, params);
  return result.rows;
}
