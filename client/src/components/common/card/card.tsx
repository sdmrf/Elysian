// Imports

// Types
interface CardProps {
  name: string;
  price: string;
  image: string;
  rating: number;
}

const Card = ({ name, price, image, rating }: CardProps) => {
  return (
    <div className="card">
      Card
      {name}
      {price}
      {image}
      {rating}
    </div>
  );
};

export default Card;
