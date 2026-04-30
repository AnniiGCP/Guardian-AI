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
    if (!file.name.endsWith('.json')) {
      setError('Please drop a .json file')
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
      setError('Please paste JSON or upload a .json file')
      return
    }
    const validationErr = validateJson(jsonText)
    if (validationErr) {
      setError(validationErr)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const parsed = JSON.parse(jsonText)
      const body = {
        platform: parsed.platform || 'json_upload',
        messages: parsed.messages,
      }
      const res = await api.ingestJson(body)
      setResult({ type: 'json', ...res })
    } catch (err) {
      setError(err.message || 'Failed to submit chat log')
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
      <div className="max-w-2xl mx-auto">
        <div className="glass-card rounded-2xl p-8 text-center">
          {/* Success icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-green-600 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>

          <h2 className="font-display-sm text-display-sm text-foreground mb-2">Analysis Submitted</h2>
          <p className="font-body-lg text-body-lg text-muted-foreground mb-6">
            Your {result.type === 'audio' ? 'audio recording' : 'chat log'} has been submitted for analysis.
          </p>

          {/* Session info */}
          <div className="bg-muted/50 rounded-xl p-5 mb-6 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-muted-foreground">Session ID</span>
              <span className="font-body-md text-body-md text-foreground font-mono text-sm">{result.session_id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-muted-foreground">Status</span>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-label-sm text-label-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                {result.status || 'processing'}
              </span>
            </div>
          </div>

          {/* Transcript preview for audio */}
          {result.transcript && (
            <div className="bg-muted/50 rounded-xl p-5 mb-6 text-left">
              <div className="font-label-md text-label-md text-muted-foreground mb-2">Transcript</div>
              <p className="font-body-md text-body-md text-foreground italic leading-relaxed max-h-[200px] overflow-y-auto">
                "{result.transcript}"
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleViewResults}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-label-lg text-label-lg hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              View Results
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl font-label-lg text-label-lg transition-all duration-200 border border-border/50 flex items-center gap-2"
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
            Chat Log (JSON)
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
                  accept=".json"
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
                    <div className="font-label-md text-muted-foreground">Drop a .json file here or click to browse</div>
                    <div className="font-label-sm text-muted-foreground/70 mt-1">Supports .json files</div>
                  </div>
                )}
              </div>

              {/* Or divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border/50"></div>
                <span className="font-label-sm text-label-sm text-muted-foreground">or paste JSON directly</span>
                <div className="flex-1 h-px bg-border/50"></div>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={jsonText}
                  onChange={(e) => { setJsonText(e.target.value); setError(null) }}
                  placeholder={SAMPLE_JSON}
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
