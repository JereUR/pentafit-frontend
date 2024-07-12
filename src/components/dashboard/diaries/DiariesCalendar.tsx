import { Diary, DiaryGroup, Days } from '@/components/types/Diary'
import Calendar from './Calendar'

interface Props {
  diaries: Diary[]
  groupDiaries: DiaryGroup[]
  selectedDays: Days
}

const DiariesCalendar: React.FC<Props> = ({
  diaries,
  groupDiaries,
  selectedDays
}) => {
  return (
    <div>
      {groupDiaries.map((diaryGroup, index) => (
        <div key={index}>
          {selectedDays[index] && (
            <Calendar diaries={diaries} diaryGroup={diaryGroup} day={index} />
          )}
        </div>
      ))}
    </div>
  )
}

export default DiariesCalendar
