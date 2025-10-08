export function calcCourseProgress(course, userId) {
  const modules = course?.modules || []
  if (!modules.length) return 0
  const completed = modules.filter(m => (m.completedBy || []).includes(userId)).length
  return Math.round((completed / modules.length) * 100)
}
