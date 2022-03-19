interface Course {
  name: string
  students: string[]
}

interface GlobalState {
  user: string | null
  loading: boolean
  courses: Course[]
}
