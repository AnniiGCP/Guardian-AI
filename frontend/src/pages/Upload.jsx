import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const ACCEPTED_AUDIO = '.wav,.mp3,.m4a,.ogg,.webm,.flac'

const SAMPLE_JSON = `{
  "platform": "json_upload",
  "messages": [
    {
      "sender": "stranger",
      "text": "hey you're really mature for your age",
      "timestamp": "2025-01-01T22:14:00Z"
    },
    {
      "sender": "child",
      "text": "thanks i guess",
      "timestamp": "2025-01-01T22:15:00Z"
    }
  ]
}`

const Upload = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const audioInputRef = useRef(null)

  // Tab state
  const [activeTab, setActiveTab] = useState('json') // 'json' | 'audio'

  // JSON upload state
  const [jsonText, setJsonText] = useState('')
  const [jsonFileName, setJsonFileName] = useState('')

  // Audio upload state
  const [audioFile, setAudioFile] = useState(null)

  // Shared state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  // ─── JSON file handling ──────────────────────────────
  const handleJsonFile = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setJsonFileName(file.name)
    setError(null)
    const reader = new FileReader()
    reader.onload = (ev) => {
      setJsonText(ev.target.result)
    }
    reader.onerror = () => setError('Failed to read file')
    reader.readAsText(file)
  }, [])

  const handleJsonDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    if (!file.name.endsWith('.json') && !file.name.endsWith('.txt')) {
      setError('Please drop a .json or .txt file')
      return
    }
    setJsonFileName(file.name)
    setError(null)
    const reader = new FileReader()
    reader.onload = (ev) => setJsonText(ev.target.result)
    reader.readAsText(file)
  }, [])

  // ─── Audio file handling ─────────────────────────────
  const handleAudioFile = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAudioFile(file)
    setError(null)
  }, [])

  const handleAudioDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    setAudioFile(file)
    setError(null)
  }, [])

  // ─── Validation ──────────────────────────────────────
  function validateJson(text) {
    try {
      const parsed = JSON.parse(text)
      if (!parsed.messages || !Array.isArray(parsed.messages) || parsed.messages.length === 0) {
        return 'JSON must contain a non-empty "messages" array'
      }
      for (let i = 0; i < parsed.messages.length; i++) {
        const m = parsed.messages[i]
        if (!m.sender || !m.text || !m.timestamp) {
          return `Message at index ${i} must have "sender", "text", and "timestamp" fields`
        }
      }
      return null
    } catch (err) {
      return 'Invalid JSON: ' + err.message
    }
  }

  // ─── Submit handlers ─────────────────────────────────
  const handleJsonSubmit = async () => {
    if (!jsonText.trim()) {
      setError('Please paste text/JSON or upload a file')
      return
    }

    let body;

    // Treat as JSON if it looks like a JSON object or array
    if (jsonText.trim().startsWith('{') || jsonText.trim().startsWith('[')) {
      const validationErr = validateJson(jsonText)
      if (validationErr) {
        setError(validationErr)
        return
      }
      const parsed = JSON.parse(jsonText)
      body = {
        platform: parsed.platform || 'json_upload',
        messages: parsed.messages || parsed,
      }
    } else {
      // Treat as plain text
      const lines = jsonText.split('\n').filter(line => line.trim())
      body = {
        platform: 'text_upload',
        messages: lines.map(line => ({
          sender: 'unknown',
          text: line.trim(),
          timestamp: new Date().toISOString()
        }))
      }
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await api.ingestJson(body)
      setResult({ type: body.platform === 'text_upload' ? 'text' : 'json', ...res })
    } catch (err) {
      setError(err.message || 'Failed to submit log')
    } finally {
      setLoading(false)
    }
  }

  const handleAudioSubmit = async () => {
    if (!audioFile) {
      setError('Please select an audio file')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await api.ingestAudio(audioFile)
      setResult({ type: 'audio', ...res })
    } catch (err) {
      setError(err.message || 'Failed to submit audio')
    } finally {
      setLoading(false)
    }
  }

  const handleViewResults = () => {
    if (result?.session_id) {
      navigate(`/dashboard/${result.session_id}`)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    setJsonText('')
    setJsonFileName('')
    setAudioFile(null)
  }

  // ─── Render: Success state ───────────────────────────
  if (result) {
    return (
      <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="glass-card rounded-3xl p-10 text-center relative overflow-hidden w-full min-w-0">
          {/* Decorative background glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-green-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Success icon */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/10 border-2 border-green-500/20 flex items-center justify-center relative z-10">
            <span className="material-symbols-outlined text-green-500 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>

          <h2 className="font-display-sm text-2xl md:text-3xl text-foreground mb-3 relative z-10">Analysis Submitted</h2>
          <p className="text-base text-muted-foreground mb-8 leading-relaxed relative z-10" style={{ maxWidth: '28rem', margin: '0 auto 2rem auto', textAlign: 'center', width: '100%' }}>
            Your {result.type === 'audio' ? 'audio recording' : 'chat log'} has been submitted for grooming pattern analysis.
          </p>

          {/* Session info */}
          <div className="bg-muted/30 dark:bg-zinc-800/40 rounded-2xl p-6 mb-8 text-left space-y-4 border border-border/30 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Session ID</span>
              <span className="text-sm text-foreground font-mono bg-muted/50 dark:bg-zinc-700/40 px-3 py-1.5 rounded-lg break-all select-all">{result.session_id}</span>
            </div>
            <div className="h-px bg-border/30"></div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Status</span>
              <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                {result.status || 'processing'}
              </span>
            </div>
          </div>

          {/* Transcript preview for audio */}
          {result.transcript && (
            <div className="bg-muted/30 dark:bg-zinc-800/40 rounded-2xl p-6 mb-8 text-left border border-border/30 relative z-10">
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">mic</span>
                Transcript
              </div>
              <p className="text-sm text-foreground italic leading-relaxed max-h-[200px] overflow-y-auto pr-2">
                "{result.transcript}"
              </p>
            </div>
          )}

          {/* Preview for JSON/Text */}
          {(result.type === 'json' || result.type === 'text') && jsonText && (
            <div className="bg-muted/30 dark:bg-zinc-800/40 rounded-2xl p-6 mb-8 text-left border border-border/30 relative z-10">
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">description</span>
                Submitted Content
              </div>
              <pre className="text-xs text-foreground leading-relaxed max-h-[200px] overflow-y-auto pr-2 font-mono whitespace-pre-wrap opacity-80">
                {jsonText.length > 500 ? jsonText.substring(0, 500) + '...' : jsonText}
              </pre>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <button
              onClick={handleViewResults}
              className="px-8 py-3.5 bg-primary text-primary-foreground rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              View Results
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-3.5 bg-white dark:bg-zinc-800 hover:bg-muted text-foreground rounded-2xl font-bold text-sm transition-all duration-300 border border-border/50 hover:border-border flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Upload
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Render: Upload form ─────────────────────────────
  return (
    <div className="max-w-3xl mx-auto relative">
      {/* Dynamic Background Glow */}
      <div className={`absolute -inset-20 blur-[120px] opacity-15 -z-10 transition-all duration-1000 ${activeTab === 'audio' ? 'bg-brand-pink' : 'bg-primary'}`}></div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display-sm text-display-sm text-foreground mb-2">Upload for Analysis</h1>
        <p className="font-body-lg text-body-lg text-muted-foreground">
          Submit chat logs or audio recordings for grooming pattern analysis.
        </p>
      </div>

      {/* Tab selector */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="flex border-b border-border/50">
          <button
            onClick={() => { setActiveTab('json'); setError(null) }}
            className={`flex-1 py-4 px-6 font-label-lg text-label-lg flex items-center justify-center gap-2 transition-all duration-200 border-b-2 ${
              activeTab === 'json'
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            Chat Log (JSON/Text)
          </button>
          <button
            onClick={() => { setActiveTab('audio'); setError(null) }}
            className={`flex-1 py-4 px-6 font-label-lg text-label-lg flex items-center justify-center gap-2 transition-all duration-200 border-b-2 ${
              activeTab === 'audio'
                ? 'border-brand-pink text-brand-pink bg-brand-pink/5'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
            Audio Recording
          </button>
        </div>

        <div className="p-6">
          {/* ── JSON Tab ── */}
          {activeTab === 'json' && (
            <div className="space-y-5">
              {/* Drop zone / file picker */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleJsonDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border hover:border-primary/50 rounded-xl p-6 text-center cursor-pointer transition-all duration-200 hover:bg-primary/[0.02] group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.txt"
                  onChange={handleJsonFile}
                  className="hidden"
                />
                <span className="material-symbols-outlined text-3xl text-muted-foreground group-hover:text-primary transition-colors mb-2 block">upload_file</span>
                {jsonFileName ? (
                  <div>
                    <div className="font-label-md text-foreground flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                      {jsonFileName}
                    </div>
                    <div className="font-label-sm text-muted-foreground mt-1">Click to choose a different file</div>
                  </div>
                ) : (
                  <div>
                    <div className="font-label-md text-muted-foreground">Drop a .json or .txt file here or click to browse</div>
                    <div className="font-label-sm text-muted-foreground/70 mt-1">Supports .json or .txt files</div>
                  </div>
                )}
              </div>

              {/* Or divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border/50"></div>
                <span className="font-label-sm text-label-sm text-muted-foreground">or paste JSON/text directly</span>
                <div className="flex-1 h-px bg-border/50"></div>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={jsonText}
                  onChange={(e) => { setJsonText(e.target.value); setError(null) }}
                  placeholder="Paste your JSON or text here..."
                  rows={12}
                  className="w-full bg-muted/50 border border-border/50 rounded-xl p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all resize-y"
                />
                {jsonText && (
                  <button
                    onClick={() => { setJsonText(''); setJsonFileName(''); setError(null) }}
                    className="absolute top-3 right-3 p-1 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                    title="Clear"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
              </div>

              {/* Expected format hint */}
              <details className="group">
                <summary className="font-label-sm text-label-sm text-primary cursor-pointer flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Expected JSON format
                </summary>
                <pre className="mt-2 p-3 bg-muted/70 rounded-lg text-xs font-mono text-muted-foreground overflow-x-auto">
{SAMPLE_JSON}
                </pre>
              </details>

              {/* Submit */}
              <button
                onClick={handleJsonSubmit}
                disabled={loading || !jsonText.trim()}
                className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-label-lg text-label-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    Analyzing…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">science</span>
                    Submit for Analysis
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── Audio Tab ── */}
          {activeTab === 'audio' && (
            <div className="space-y-5">
              {/* Drop zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleAudioDrop}
                onClick={() => audioInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 group ${
                  activeTab === 'audio' 
                    ? 'border-brand-pink/30 hover:border-brand-pink hover:bg-brand-pink/[0.02]' 
                    : 'border-border hover:border-primary/50 hover:bg-primary/[0.02]'
                }`}
              >
                <input
                  ref={audioInputRef}
                  type="file"
                  accept={ACCEPTED_AUDIO}
                  onChange={handleAudioFile}
                  className="hidden"
                />
                {audioFile ? (
                  <div>
                    <span className="material-symbols-outlined text-4xl text-brand-pink mb-3 block">audio_file</span>
                    <div className="font-label-md text-foreground flex items-center justify-center gap-2 mb-1">
                      {audioFile.name}
                    </div>
                    <div className="font-label-sm text-muted-foreground">
                      {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                    <div className="font-label-sm text-primary mt-2">Click to choose a different file</div>
                  </div>
                ) : (
                  <div>
                    <span className="material-symbols-outlined text-4xl text-muted-foreground group-hover:text-primary transition-colors mb-3 block">graphic_eq</span>
                    <div className="font-label-md text-muted-foreground mb-1">Drop an audio file here or click to browse</div>
                    <div className="font-label-sm text-muted-foreground/70">Supports WAV, MP3, M4A, OGG, WebM, FLAC</div>
                  </div>
                )}
              </div>

              {/* Info card */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-blue-500 text-[20px] mt-0.5">info</span>
                <div className="text-sm text-blue-700 dark:text-blue-400">
                  <strong>How it works:</strong> Your audio file will be transcribed using Whisper STT, then the transcript is automatically analyzed for grooming patterns — just like a chat log.
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleAudioSubmit}
                disabled={loading || !audioFile}
                className="w-full py-3.5 bg-brand-pink text-white rounded-xl font-label-lg text-label-lg hover:bg-brand-pink/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    Transcribing & Analyzing…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">mic</span>
                    Upload & Analyze
                  </>
                )}
              </button>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
              <span className="material-symbols-outlined text-red-500 text-[20px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
              <div className="text-sm text-red-700 dark:text-red-400">{error}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Upload
