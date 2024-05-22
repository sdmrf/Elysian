import { Testimonial } from "../../../../types/types"
import { Star } from "@phosphor-icons/react"
const SingleTestimonial = ({img, backdrop, name, heading, review, stars} : Testimonial) => {
  return (
    <div className='singletestimonial'>
      <div className="backdrop">
        <img src={backdrop} alt="" />
      </div>
      <div className="container">
        <div className="content">
            <div className="img">
                <img src={img} alt="" />
            </div>
            <div className="text">
                <h2>{name}</h2>
                <span>{heading}</span>
                <p>{review}</p>
            </div>
            <div className="review">
                {[...Array(stars)].map((_, index) => (
                    <Star key={index} weight="fill" />
                ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default SingleTestimonial
