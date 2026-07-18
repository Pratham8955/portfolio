'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { DecodedText } from './decoded-text'
import { Terminal as TerminalIcon, Play, RefreshCw, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type LogEntry = {
  text: string
  type: 'input' | 'output' | 'error' | 'success'
}

export function InteractiveSandbox() {
  const shouldReduceMotion = !!useReducedMotion()
  const [history, setHistory] = useState<LogEntry[]>([
    { text: 'System initialized. Welcome to Pratham\'s Developer Sandbox.', type: 'success' },
    { text: 'Type "help" for a list of available commands or "play" to start the mini-game.', type: 'output' },
  ])
  const [inputVal, setInputVal] = useState('')
  const [isPlayingGame, setIsPlayingGame] = useState(false)
  const consoleRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Snake Game State
  const GRID_SIZE = 15
  const [snake, setSnake] = useState<[number, number][]>([[7, 7]])
  const [food, setFood] = useState<[number, number]>([3, 3])
  const [direction, setDirection] = useState<[number, number]>([0, -1]) // Up
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToBottom = () => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [history, isPlayingGame])

  // Focus terminal input on click
  const focusInput = () => {
    if (!isPlayingGame) {
      inputRef.current?.focus()
    }
  }

  // Handle CLI Commands
  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const newHistory = [...history, { text: `pratham-sali@portfolio:~$ ${cmd}`, type: 'input' } as LogEntry]

    if (trimmed.includes('help') || trimmed === '?') {
      newHistory.push(
        { text: 'Available commands:', type: 'success' },
        { text: '  about      - Who is Pratham Sali?', type: 'output' },
        { text: '  skills     - Display technical stack', type: 'output' },
        { text: '  projects   - Show highlighted works', type: 'output' },
        { text: '  play       - Launch retro Snake Game', type: 'output' },
        { text: '  clear      - Clear the console logs', type: 'output' }
      )
    } else if (trimmed.includes('clear') || trimmed === 'cls') {
      setHistory([])
      setInputVal('')
      return
    } else if (trimmed.includes('about') || trimmed.includes('who') || trimmed.includes('pratham') || trimmed.includes('info')) {
      newHistory.push({
        text: 'Pratham Sali: Software Engineer and Full-Stack Developer. Completed internship at Elaunch Solutions and graduated with an MSc in ICT. Expert in TypeScript, Node.js, and Java.',
        type: 'output',
      })
    } else if (trimmed.includes('skills') || trimmed.includes('tech') || trimmed.includes('stack') || trimmed.includes('languages')) {
      newHistory.push({
        text: 'Backend: Node.js, Express, Spring MVC, .NET Core, Java, C#\nFrontend: Next.js, React, HTML, CSS, TailwindCSS\nDatabases: MongoDB, Redis, MySQL, SQL Server',
        type: 'output',
      })
    } else if (trimmed.includes('projects') || trimmed.includes('works') || trimmed.includes('portfolio')) {
      newHistory.push(
        { text: 'Highlighted Projects:', type: 'success' },
        { text: '  • Maham - Guard Coordination Web App (Next.js, Node.js, Redis)', type: 'output' },
        { text: '  • MFTran - Backend Query Management APIs (Advanced Java)', type: 'output' },
        { text: '  • CampusWave - Academic ERP System (.NET Core, React, SQL Server)', type: 'output' }
      )
    } else if (trimmed.includes('play') || trimmed.includes('game') || trimmed.includes('snake')) {
      newHistory.push({ text: 'Launching Snake Game... Use Arrow keys (or WASD) to navigate. Esc to exit.', type: 'success' })
      setIsPlayingGame(true)
      resetGame()
    } else if (trimmed === '') {
      // Empty input
    } else {
      newHistory.push({ text: `Command not found: "${cmd}". Type "help" for a list of commands.`, type: 'error' })
    }

    setHistory(newHistory)
    setInputVal('')
  }

  // Snake Game Logic
  const resetGame = () => {
    setSnake([[7, 7]])
    generateFood()
    setDirection([0, -1])
    setIsGameOver(false)
    setScore(0)
  }

  const generateFood = () => {
    let newFood: [number, number]
    do {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE),
      ]
    } while (snake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]))
    setFood(newFood)
  }

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPlayingGame) {
        if (e.key === 'Escape') {
          setIsPlayingGame(false)
          setHistory(prev => [...prev, { text: 'Game exited by player.', type: 'output' }])
          return
        }

        const key = e.key.toLowerCase()
        if ((key === 'arrowup' || key === 'w') && direction[1] !== 1) {
          e.preventDefault()
          setDirection([0, -1])
        } else if ((key === 'arrowdown' || key === 's') && direction[1] !== -1) {
          e.preventDefault()
          setDirection([0, 1])
        } else if ((key === 'arrowleft' || key === 'a') && direction[0] !== 1) {
          e.preventDefault()
          setDirection([-1, 0])
        } else if ((key === 'arrowright' || key === 'd') && direction[0] !== -1) {
          e.preventDefault()
          setDirection([1, 0])
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlayingGame, direction])

  // Main Game Loop
  useEffect(() => {
    if (isPlayingGame && !isGameOver) {
      gameIntervalRef.current = setInterval(() => {
        setSnake(prevSnake => {
          const head = prevSnake[0]
          const newHead: [number, number] = [
            head[0] + direction[0],
            head[1] + direction[1],
          ]

          // Check Wall collision
          if (
            newHead[0] < 0 ||
            newHead[0] >= GRID_SIZE ||
            newHead[1] < 0 ||
            newHead[1] >= GRID_SIZE
          ) {
            setIsGameOver(true)
            return prevSnake
          }

          // Check Self collision
          if (prevSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
            setIsGameOver(true)
            return prevSnake
          }

          const newSnake = [newHead, ...prevSnake]

          // Check Food eating
          if (newHead[0] === food[0] && newHead[1] === food[1]) {
            setScore(prev => {
              const next = prev + 10
              if (next > highScore) setHighScore(next)
              return next
            })
            generateFood()
          } else {
            newSnake.pop()
          }

          return newSnake
        })
      }, 130)
    }

    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current)
    }
  }, [isPlayingGame, isGameOver, food, direction, highScore])

  const handleMobileNav = (xDir: number, yDir: number) => {
    if (xDir !== 0 && direction[0] !== -xDir) setDirection([xDir, 0])
    if (yDir !== 0 && direction[1] !== -yDir) setDirection([0, yDir])
  }

  return (
    <section id="sandbox" className="portfolio-container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <DecodedText text="Interactive Lab" />
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Test my sandbox console environment, run CLI commands, or play the retro Snake mini-game.
          </p>
        </div>

        {/* Terminal Container */}
        <div 
          onClick={focusInput}
          className="w-full max-w-3xl mx-auto rounded-2xl border border-border/40 bg-card/25 backdrop-blur-md overflow-hidden shadow-2xl flex flex-col min-h-[420px] max-h-[500px]"
        >
          {/* Header Bar */}
          <div className="bg-muted/30 border-b border-border/20 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 block" />
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground select-none">
              <TerminalIcon size={14} className="text-accent" />
              bash - pratham-dev-sandbox
            </div>
            <div className="w-12" />
          </div>

          {/* Console Area */}
          <div 
            ref={consoleRef}
            className="p-6 flex-1 overflow-y-auto font-mono text-sm leading-relaxed flex flex-col gap-2"
          >
            {!isPlayingGame ? (
              <>
                {history.map((log, i) => (
                  <div 
                    key={i} 
                    className={
                      log.type === 'input' 
                        ? 'text-foreground' 
                        : log.type === 'success' 
                        ? 'text-accent' 
                        : log.type === 'error' 
                        ? 'text-red-400' 
                        : 'text-muted-foreground'
                    }
                  >
                    {log.text.split('\n').map((line, lineIdx) => (
                      <div key={lineIdx}>{line}</div>
                    ))}
                  </div>
                ))}
                
                {/* Active Input Line */}
                <div className="flex items-center gap-2 text-foreground">
                  <span className="text-accent">pratham-sali@portfolio:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCommand(inputVal)}
                    className="flex-1 bg-transparent border-none outline-none text-foreground caret-accent p-0"
                    placeholder="type 'help'..."
                    autoFocus
                  />
                </div>
              </>
            ) : (
              /* Snake Game UI */
              <div className="flex flex-col items-center justify-center h-full gap-4 py-2">
                <div className="flex justify-between w-full max-w-xs text-xs font-bold text-muted-foreground mb-1 select-none">
                  <span>SCORE: <span className="text-accent">{score}</span></span>
                  <span>HIGH: <span className="text-foreground">{highScore}</span></span>
                  <button 
                    onClick={() => {
                      setIsPlayingGame(false)
                      setHistory(prev => [...prev, { text: 'Game closed.', type: 'output' }])
                    }} 
                    className="flex items-center gap-1 hover:text-red-400 transition-colors"
                  >
                    <X size={12} /> Exit
                  </button>
                </div>

                {/* Game Board Grid */}
                <div 
                  className="grid bg-muted/20 border border-border/40 rounded-xl relative overflow-hidden"
                  style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                    width: 'min(280px, 90vw)',
                    height: 'min(280px, 90vw)',
                  }}
                >
                  {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
                    const x = idx % GRID_SIZE
                    const y = Math.floor(idx / GRID_SIZE)
                    const isSnakeSegment = snake.some(seg => seg[0] === x && seg[1] === y)
                    const isHead = snake[0][0] === x && snake[0][1] === y
                    const isFoodCell = food[0] === x && food[1] === y

                    return (
                      <div
                        key={idx}
                        className={`aspect-square transition-colors duration-100 ${
                          isHead
                            ? 'bg-accent shadow-md shadow-accent/50 scale-105 rounded-sm z-10'
                            : isSnakeSegment
                            ? 'bg-accent/60 scale-[0.9] rounded-sm'
                            : isFoodCell
                            ? 'bg-red-500 animate-pulse rounded-full scale-[0.8]'
                            : 'border-[0.2px] border-border/5'
                        }`}
                      />
                    )
                  })}

                  {/* Game Over Screen Overlay */}
                  {isGameOver && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                      <div className="text-red-400 font-bold text-lg select-none">GAME OVER</div>
                      <div className="text-xs text-muted-foreground select-none">Final Score: {score}</div>
                      <button
                        onClick={resetGame}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-xs font-bold hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
                      >
                        <RefreshCw size={12} /> Play Again
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Virtual Arrow Keys */}
                <div className="grid grid-cols-3 gap-2 w-32 md:hidden pt-2">
                  <div />
                  <button 
                    onClick={() => handleMobileNav(0, -1)} 
                    className="p-3 bg-muted/40 hover:bg-muted/70 text-foreground border border-border/20 rounded-xl flex items-center justify-center animate-none"
                  >
                    ▲
                  </button>
                  <div />
                  <button 
                    onClick={() => handleMobileNav(-1, 0)} 
                    className="p-3 bg-muted/40 hover:bg-muted/70 text-foreground border border-border/20 rounded-xl flex items-center justify-center animate-none"
                  >
                    ◀
                  </button>
                  <div />
                  <button 
                    onClick={() => handleMobileNav(1, 0)} 
                    className="p-3 bg-muted/40 hover:bg-muted/70 text-foreground border border-border/20 rounded-xl flex items-center justify-center animate-none"
                  >
                    ▶
                  </button>
                  <div />
                  <button 
                    onClick={() => handleMobileNav(0, 1)} 
                    className="p-3 bg-muted/40 hover:bg-muted/70 text-foreground border border-border/20 rounded-xl flex items-center justify-center animate-none"
                  >
                    ▼
                  </button>
                  <div />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
