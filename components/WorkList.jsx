import "@styles/WorkList.scss"
import WorkCard from "./WorkCard"

const WorkList = ({ data }) => {
  return (
    <div className='work-list'>
    {data
      .slice() // Cria uma cópia do array para evitar mutação
      .reverse()
      .map((work) => (
        <WorkCard
          key={work._id}
          work={work}
        />
      ))}
    </div>
  )
}

export default WorkList