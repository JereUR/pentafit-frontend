import { Diary, DiaryGroup } from '@/components/types/Diary'
import Calendar from './Calendar'


interface Props {
  diaries:Diary[]
  groupDiaries: DiaryGroup[]
}

const DiariesCalendar:React.FC<Props> = ({diaries, groupDiaries}) => {
  return (
    <div>
      {groupDiaries.map((diaryGroup, index) => (
        <div key={index}>
          <Calendar diaries={ diaries} diaryGroup={diaryGroup} day={index} />
        </div>
      ))}
    </div>
  )
}

export default DiariesCalendar
