export function searchParamsToObject(searchParams: URLSearchParams) {
  return Object.fromEntries(
    [...searchParams.entries()].filter(([, value]) => value !== "")
  )
}

export async function readJson(request: Request) {
  try {
    return await request.json()
  } catch {
    return {}
  }
}
