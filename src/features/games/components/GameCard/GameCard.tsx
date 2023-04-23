import styles from "./GameCard.module.css";

interface GameCardProps {
  name: string;
  imageUrl: string;
}

export const GameCard = ({ name, imageUrl }: GameCardProps) => (
  <div className={styles.container}>
    <img
      src={imageUrl}
      aria-hidden
      alt="Game image"
      className={styles.image}
    />
    <h2 className={styles.name}>{name}</h2>
  </div>
);
