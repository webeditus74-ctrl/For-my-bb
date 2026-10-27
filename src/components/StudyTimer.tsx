import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, Maximize2, Minimize2, CheckCircle2, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';
import { translations } from '../translations';
import { soundManager } from '../utils/sound';
import { storage } from '../utils/storage';

interface Props {
  language: Language;
  onTimeLogged?: (minutes: number) => void;
}

type TimerMode = 'pomodoro' | 'deep' | 'stopwatch';

export const StudyTimer: React.FC<Props> = ({ language, onTimeLogged }) => {
  const t = translations[language];
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);
  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [elapsedMinutesSession, setElapsedMinutesSession] = useState<number>(0);
  const [showLoggedToast, setShowLoggedToast] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  // Set mode times
  const selectMode = (newMode: TimerMode) => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setMode(newMode);
    if (newMode === 'pomodoro') setSecondsLeft(25 * 60);
    if (newMode === 'deep') setSecondsLeft(50 * 60);
    if (newMode === 'stopwatch') setStopwatchSeconds(0);
  };

  // Timer tick effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        if (mode === 'stopwatch') {
          setStopwatchSeconds(prev => {
            const next = prev + 1;
            // Every 60 seconds of stopwatch, increment logged session
            if (next % 60 === 0) {
              setElapsedMinutesSession(m => m + 1);
            }
            return next;
          });
        } else {
          setSecondsLeft(prev => {
            if (prev <= 1) {
              clearInterval(timerRef.current!);
              setIsRunning(false);
              handleTimerComplete();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode]);

  const handleTimerComplete = () => {
    soundManager.playTimerFinish();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });

    const completedMins = mode === 'pomodoro' ? 25 : 50;
    storage.recordStudyTime(completedMins);
    if (onTimeLogged) onTimeLogged(completedMins);

    setShowLoggedToast(true);
    setTimeout(() => setShowLoggedToast(false), 4000);
  };

  const toggleRun = () => {
    soundManager.playClick();
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    soundManager.playClick();
    setIsRunning(false);
    if (mode === 'stopwatch') {
      // If stopwatch had minutes, log them!
      const mins = Math.floor(stopwatchSeconds / 60);
      if (mins > 0) {
        storage.recordStudyTime(mins);
        if (onTimeLogged) onTimeLogged(mins);
        setShowLoggedToast(true);
        setTimeout(() => setShowLoggedToast(false), 4000);
      }
      setStopwatchSeconds(0);
    } else {
      setSecondsLeft(mode === 'pomodoro' ? 25 * 60 : 50 * 60);
    }
  };

  // Formatting MM:SS
  const currentSeconds = mode === 'stopwatch' ? stopwatchSeconds : secondsLeft;
  const mins = Math.floor(currentSeconds / 60);
  const secs = currentSeconds % 60;
  const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const progressPercent = mode === 'stopwatch'
    ? Math.min(100, (stopwatchSeconds % 3600) / 36)
    : mode === 'pomodoro'
    ? ((25 * 60 - secondsLeft) / (25 * 60)) * 100
    : ((50 * 60 - secondsLeft) / (50 * 60)) * 100;

  return (
    <div className={`transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-white' : 'bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800'}`}>
      
      {/* Header bar */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {t.timerStudy}
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-500 inline" />
              {language === 'mr' ? 'एकाग्रता वाढवा' : 'Boost retention'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Zen Focus Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mode selectors */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4 text-xs font-semibold">
        <button
          onClick={() => selectMode('pomodoro')}
          className={`flex-1 py-1.5 px-2 rounded-lg transition text-center ${mode === 'pomodoro' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
        >
          {t.timerModePomodoro}
        </button>
        <button
          onClick={() => selectMode('deep')}
          className={`flex-1 py-1.5 px-2 rounded-lg transition text-center ${mode === 'deep' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
        >
          {t.timerModeLong}
        </button>
        <button
          onClick={() => selectMode('stopwatch')}
          className={`flex-1 py-1.5 px-2 rounded-lg transition text-center ${mode === 'stopwatch' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
        >
          {t.timerModeStopwatch}
        </button>
      </div>

      {/* Timer circular display */}
      <div className="flex flex-col items-center justify-center my-3 relative">
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* Circular SVG Progress */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-indigo-600 dark:stroke-indigo-400 transition-all duration-500 ease-linear"
              strokeWidth="6"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums">
              {timeString}
            </span>
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
              {isRunning 
                ? (language === 'mr' ? 'अभ्यास सुरू आहे' : 'Focusing') 
                : (language === 'mr' ? 'थांबलेला' : 'Ready')}
            </span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-3 mt-3">
        <button
          onClick={resetTimer}
          className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition active:scale-95 cursor-pointer"
          title={t.timerReset}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={toggleRun}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition active:scale-95 cursor-pointer ${isRunning ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>{t.timerPause}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{t.timerStart}</span>
            </>
          )}
        </button>
      </div>

      {/* Logged feedback toast */}
      {showLoggedToast && (
        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{t.loggedToToday}</span>
        </div>
      )}
    </div>
  );
};
