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
    const classes: any[] = []
    let query = ''
    classIds.forEach((classId, index) => {
      if (index < classIds.length - 1) {
        query += `RECORD_ID() = '${classId}',`
      } else {
        query += `RECORD_ID() = '${classId}'`
      }
    })

    airtableFetcher('Classes')
      .select({
        filterByFormula: `OR(${query})`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            classes.push({
              name: record.get('Name'),
              students: record.get('Students'),
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

export const getStudentsMapper = (classes: Course[]) => {
  return new Promise((resolve, reject) => {
    const studentsMapper: any = {}
    classes.forEach((singleClass) => {
      singleClass.students.forEach((student) => {
        studentsMapper[student] = ''
      })
    })

    let query = ''
    for (const studentId in studentsMapper) {
      query += `RECORD_ID() = '${studentId}',`
    }
    query = query.substring(0, query.length - 1)

    airtableFetcher('Students')
      .select({
        filterByFormula: `OR(${query})`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            studentsMapper[record.getId()] = record.get('Name')
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
  studentsMapper: any
): Course[] => {
  classes.forEach((_, index) => {
    classes[index].students = classes[index].students.map(
      (studentId) => studentsMapper[studentId]
    )
  })
  return classes
}
