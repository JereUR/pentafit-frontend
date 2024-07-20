import { Diary, DiaryGroup, Days, GroupedData } from '@/components/types/Diary'
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
  setDiaryToShow: (diary: Diary | null) => void
  setShowInfo: (show: boolean) => void
  handleClickDelete: ({ diary }: { diary: GroupedData | Diary }) => void
}

const DiariesCalendar: React.FC<Props> = ({
  diaries,
  groupDiaries,
  selectedDays,
  selectAll,
  handleSelectAllChange,
  selectedDiaries,
  handleCheckboxChange,
  setDiaryToShow,
  setShowInfo,
  handleClickDelete
}) => {
  return (
    <div>
      {groupDiaries.length === 0 ? (
        <div className="flex justify-center items-center text-xl italic font-light mt-12 p-6 border border-gray-200 dark:border-muted rounded-lg shadow-md">
          Sin agendas creadas
        </div>
      ) : (
        groupDiaries.map((diaryGroup, index) => (
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
                setDiaryToShow={setDiaryToShow}
                setShowInfo={setShowInfo}
                handleClickDelete={handleClickDelete}
              />
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default DiariesCalendar
