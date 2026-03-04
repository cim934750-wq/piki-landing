// 서버 시작 시 필수 환경변수 검증
const REQUIRED_SERVER_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'ADMIN_PASSWORD',
  'SESSION_SECRET',
] as const

export function validateEnv() {
  const missing = REQUIRED_SERVER_VARS.filter((key) => !process.env[key])
  if (missing.length > 0) {
    throw new Error(
      `Missing environment variables:\n${missing.map((k) => `  - ${k}`).join('\n')}\n` +
      'See .env.example for required variables.'
    )
  }
}
