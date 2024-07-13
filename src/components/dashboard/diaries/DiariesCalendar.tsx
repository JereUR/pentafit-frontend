import { Diary, DiaryGroup, Days } from '@/components/types/Diary'
import Calendar from './Calendar'

interface Props {
  diaries: Diary[]
  groupDiaries: DiaryGroup[]
  selectedDays: Days
  selectAll: boolean
  handleSelectAllChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  selectedDiaries: number[]
  handleCheckboxChange: (
    diaryId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
}

const DiariesCalendar: React.FC<Props> = ({
  diaries,
  groupDiaries,
  selectedDays,
  selectAll,
  handleSelectAllChange,
  selectedDiaries,
  handleCheckboxChange
}) => {
  return (
    <div>
      {groupDiaries.map((diaryGroup, index) => (
        <div key={index}>
          {selectedDays[index] && (
            <Calendar
              diaries={diaries}
              diaryGroup={diaryGroup}
              day={index}
              selectAll={selectAll}
              handleSelectAllChange={handleSelectAllChange}
              selectedDiaries={selectedDiaries}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default DiariesCalendar
