import NavBar from '../components/NavBar';
// import ConcertCard from '../components/ConcertCard';
import Dashboard from '../components/Dashboard';
import styles from '../styles/HomePage.module.css';

export default function HomePage() {
  return (
      <div className={styles.container}>
          <NavBar />
          <Dashboard />
          {/* Other homepage content */}
      </div>
  );
}
