import React from 'react'
import NoteView from './NoteView'
import { useQuery } from 'react-query'
import { useLocalStorage } from '@/hooks/useStorage'
import { getNoteLessonAndCourses } from '@/service/note'

type Props = {
  toggleDrawerNote:any
  openNote:any
  lesson_id:any
   courses_id:any
}

const NoteController = ({toggleDrawerNote,openNote,lesson_id,courses_id}: Props) => {
  const [user, setUser] = useLocalStorage("user", {});

  const { data } = useQuery(["note",lesson_id], {
    queryFn: () => getNoteLessonAndCourses({courses_id,lesson_id,user_id:user.data[0]._id}),
  });
  console.log(data);
  return (
    <><NoteView toggleDrawerNote={toggleDrawerNote} data={data?.status==0&&data.data} openNote={openNote} /></>
  )
}

export default NoteController