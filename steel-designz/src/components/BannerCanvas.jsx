/**
 * WebGL liquid distortion effect over the banner image
 * Mouse-reactive displacement shader
 */
import { useEffect, useRef, useState } from 'react'

const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform sampler2D u_image;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform float u_time;
  varying vec2 v_texCoord;

  void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse;
    float dist = distance(uv, mouse);
    float influence = 0.6 * exp(-dist * 2.0);
    float wave = sin(dist * 20.0 - u_time * 1.5) * 0.5 + 0.5;
    influence *= wave;
    vec2 dir = normalize(uv - mouse + 0.001);
    vec2 disp = dir * influence * 0.12;
    uv += disp;
    gl_FragColor = texture2D(u_image, uv);
  }
`

export default function BannerCanvas({ imageSrc, className = '' }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 })
  const timeRef = useRef(0)
  const rafRef = useRef(null)
  const [isTouch] = useState(() => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches)

  useEffect(() => {
    if (isTouch || !imageSrc) return
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    if (!canvas || !container) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    if (!gl) return

    const program = gl.createProgram()
    const vs = gl.createShader(gl.VERTEX_SHADER)
    const fs = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(vs, VERTEX_SHADER)
    gl.shaderSource(fs, FRAGMENT_SHADER)
    gl.compileShader(vs)
    gl.compileShader(fs)
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const positionLoc = gl.getAttribLocation(program, 'a_position')
    const texCoordLoc = gl.getAttribLocation(program, 'a_texCoord')
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse')
    const timeLoc = gl.getUniformLocation(program, 'u_time')

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 0, 1, 1, -1, 1, 1, -1, 1, 0, 0, 1, 1, 1, 0
    ]), gl.STATIC_DRAW)

    const texture = gl.createTexture()
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    }
    img.src = imageSrc

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width
      mouseRef.current.targetY = 1.0 - (e.clientY - rect.top) / rect.height
    }

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0.5
      mouseRef.current.targetY = 0.5
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', resize)
    resize()

    const draw = () => {
      timeRef.current += 0.016
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.enableVertexAttribArray(positionLoc)
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 16, 0)
      gl.enableVertexAttribArray(texCoordLoc)
      gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 16, 8)

      gl.uniform2f(mouseLoc, mouseRef.current.x, mouseRef.current.y)
      gl.uniform1f(timeLoc, timeRef.current)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      gl.deleteProgram(program)
      gl.deleteTexture(texture)
    }
  }, [isTouch, imageSrc])

  if (isTouch || !imageSrc) return null

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-[1] w-full h-full object-cover ${className}`}
      aria-hidden="true"
    />
  )
}
