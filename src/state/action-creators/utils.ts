import airtableFetcher from '../../lib/airtableFetcher'

export const verifyUserAndFetchClassIds = (
  user: string
): Promise<{ userExists: boolean; classIds?: string[] }> => {
  return new Promise((resolve, reject) => {
    type User = {
      classesIds: string[]
    }
    const users: User[] = []

    airtableFetcher('Students')
      .select({
        filterByFormula: `{Name} = '${user}'`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            users.push({
              classesIds: record.get('Classes') as string[],
            })
          })
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          if (users.length > 0) {
            resolve({
              userExists: true,
              classIds: users[0].classesIds,
            })
          } else {
            resolve({
              userExists: false,
            })
          }
        }
      )
  })
}

export const fetchClasses = (classIds: string[]): Promise<Course[]> => {
  return new Promise((resolve, reject) => {
    type Class = {
      name: string
      students: string[]
    }
    const classes: Class[] = []
    const query: string = classIds
      .map((classId) => `RECORD_ID() = '${classId}'`)
      .join(',')

    airtableFetcher('Classes')
      .select({
        filterByFormula: `OR(${query})`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            classes.push({
              name: record.get('Name') as string,
              students: record.get('Students') as string[],
            })
          })
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          resolve(classes)
        }
      )
  })
}

type StudentsMapperRecords = {
  [recordId: string]: string
}

export const getStudentsMapper = (
  classes: Course[]
): Promise<StudentsMapperRecords> => {
  return new Promise((resolve, reject) => {
    const studentsMapper: StudentsMapperRecords = classes.reduce(
      (prev, singleClass) => {
        const studentsInSingleClass = singleClass.students.reduce(
          (prev, singleStudent) => {
            return {
              ...prev,
              [singleStudent]: '',
            }
          },
          {}
        )
        return {
          ...prev,
          ...studentsInSingleClass,
        }
      },
      {}
    )

    const query: string = Object.keys(studentsMapper)
      .map((studentId) => `RECORD_ID() = '${studentId}'`)
      .join(',')

    airtableFetcher('Students')
      .select({
        filterByFormula: `OR(${query})`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            studentsMapper[record.getId()] = record.get('Name') as string
          })
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          resolve(studentsMapper)
        }
      )
  })
}

export const mapStudentsInClasses = (
  classes: Course[],
  studentsMapper: StudentsMapperRecords
): Course[] => {
  classes.forEach((_, index) => {
    classes[index].students = classes[index].students.map(
      (studentId) => studentsMapper[studentId]
    )
  })
  return classes
}
