import { Database } from "bun:sqlite"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"

function readDatabaseUrl() {
  if (!existsSync(resolve(".env")) && existsSync(resolve(".env.example"))) {
    writeFileSync(resolve(".env"), readFileSync(resolve(".env.example"), "utf8"))
  }

  const envFile = existsSync(resolve(".env"))
    ? readFileSync(resolve(".env"), "utf8")
    : 'DATABASE_URL="file:./dev.db"'
  const match = envFile.match(/^DATABASE_URL=(?:"([^"]+)"|'([^']+)'|(.+))$/m)
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? "file:./dev.db"
}

function sqlitePathFromUrl(url: string) {
  const rawPath = url.replace(/^file:/, "")

  if (rawPath.startsWith("./")) {
    return resolve("prisma", rawPath.slice(2))
  }

  return resolve(rawPath)
}

const databasePath = sqlitePathFromUrl(readDatabaseUrl())
mkdirSync(dirname(databasePath), { recursive: true })

const db = new Database(databasePath)
db.run("PRAGMA foreign_keys = ON")

const migration = readFileSync(
  join("prisma", "migrations", "20260508000000_init", "migration.sql"),
  "utf8"
)

db.exec(migration)
db.close()

console.log(`SQLite schema applied at ${databasePath}`)
