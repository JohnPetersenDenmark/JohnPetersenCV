import   {currenrCVData}  from '../../GlobalData/GlobalCVData';

function WorkingHistory() {

 let tmp = currenrCVData;
  return (
    <div>
      <p className="section_title">
        { currenrCVData.WorkingExperience.sectionName}
      </p>
      {currenrCVData.WorkingExperience.entries.map((workingHistoryEntry) => (
        <div>
          <p className='working_history_entry_title'>
            {workingHistoryEntry.title}
          </p>
          <p className='working_history_entry_tofrom '>
            <span className={workingHistoryEntry.icon}></span>
            <span>{workingHistoryEntry.fromdate} - {workingHistoryEntry.todate} </span>
          </p>
          <div className='working_experience_content'>
            <div className='working_experience_content_grid_item_left'>
              {workingHistoryEntry.usedskills.map((workingHistorySKillUsed) => (
                <span className='used_skill_tag-cloud'>{workingHistorySKillUsed}</span>
              ))}
            </div>
            <div className='working_experience_content_grid_item_right'>
              {workingHistoryEntry.descriptions.map((workingHistoryEntryDescription) => (
                <p style={{ lineHeight: '1.5' }}>{workingHistoryEntryDescription}</p>
              ))}
            </div>
            <div className='working_experience_content_grid_item_achivements'>
              <p className='working_history_achivements_title'>
                {currenrCVData.WorkingExperience.achivementstitle}
              </p>
              {workingHistoryEntry.achievements.map((workingHistoryAchievement) => (

                <p className='working_history_achivements'>
                  {workingHistoryAchievement}
                </p>

              ))}
            </div>
          </div>
          <hr className="section_ruler"></hr>
        </div>
      ))}
    </div>
  );
}
export default WorkingHistory;