interface Course {
  name: string
  students: string[]
}

interface GlobalState {
  user: string | null
  courses: Course[]
}
