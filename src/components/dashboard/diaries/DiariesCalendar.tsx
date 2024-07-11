import { DiaryGroup } from '@/components/types/Diary'
import Calendar from './Calendar'

const DiariesCalendar = ({ groupDiaries }: { groupDiaries: DiaryGroup[] }) => {
  return (
    <div>
      {groupDiaries.map((diaryGroup, index) => (
        <div key={index}>
          <Calendar diaryGroup={diaryGroup} day={index} />
        </div>
      ))}
    </div>
  )
}

export default DiariesCalendar
