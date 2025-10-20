const environments = ["development", "staging", "production"] as const
type Environment = (typeof environments)[number]

const isEnvironment = (value: string): value is Environment => {
  return (environments as readonly string[]).includes(value)
}

export const environment: Environment = ((): Environment => {
  const value = process.env["ENVIRONMENT"]
  if (value == null || !isEnvironment(value)) {
    // TODO: エラー出力
    return "development"
  }
  return value
})()

export const namespace = environment
export const taskQueueNames = {
  default: "default",
}

export const databaseUrl: string = ((): string => {
  const value = process.env["DATABASE_URL"]
  if (value == null) {
    throw new Error("DATABASE_URL environment variable is not set")
  }
  return value
})()
