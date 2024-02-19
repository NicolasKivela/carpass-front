import React from 'react';
import { ProgressBar, MD3Colors, Chip } from 'react-native-paper';
import styles from './styles';
interface ProgressProps{
    progress: number,
    warning: number,
    error: number
}
const ReviewProgressBar = ({ progress}:ProgressProps) => {
  return(
  <ProgressBar progress={progress} style= {styles.navigationProgressBar}theme={{colors: styles.colors}} />
  )
  }
export default ReviewProgressBar;


