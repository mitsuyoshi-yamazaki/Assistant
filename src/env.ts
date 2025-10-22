import "dotenv/config"

// ---- Environment ---- //
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

// ---- Temporal ---- //
export const temporalServerAddress = ((): string | null => {
  const address = process.env["TEMPORAL_SERVER_ADDRESS"]
  if (address == null || address.length <= 0) {
    return null
  }
  return address
})()

export const namespace = environment
export const taskQueueNames = {
  default: "default",
}

// ---- Persistent Data ---- //
export const databaseUrl: string = ((): string => {
  const value = process.env["DATABASE_URL"]
  if (value == null) {
    throw new Error("DATABASE_URL environment variable is not set")
  }
  return value
})()
