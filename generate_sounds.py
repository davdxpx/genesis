import wave
import math
import struct
import os

def generate_wav(filename, duration, freq_func, volume=0.5, sample_rate=44100):
    num_samples = int(duration * sample_rate)
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)

        for i in range(num_samples):
            t = float(i) / sample_rate
            freq = freq_func(t)
            # Simple sine wave
            value = int(volume * 32767.0 * math.sin(2.0 * math.pi * freq * t))
            # Envelope to avoid clicking
            envelope = 1.0
            if t < 0.05:
                envelope = t / 0.05
            elif t > duration - 0.05:
                envelope = (duration - t) / 0.05
            value = int(value * envelope)

            data = struct.pack('<h', value)
            wav_file.writeframesraw(data)

os.makedirs('public/audio', exist_ok=True)

# Error: Descending low pitch
generate_wav('public/audio/error.wav', 0.5, lambda t: 200 - 100 * t)

# Success: Ascending bright pitch
generate_wav('public/audio/success.wav', 0.6, lambda t: 400 + 400 * t)

# Delete: Quick descending swoosh
generate_wav('public/audio/delete.wav', 0.3, lambda t: 300 - 200 * t)

# Placeholders (just 0.1s silent/flat)
generate_wav('public/audio/Genesis_Click.wav', 0.1, lambda t: 0, volume=0)
generate_wav('public/audio/Genesis_ConfirmationClick.wav', 0.1, lambda t: 0, volume=0)
generate_wav('public/audio/Genesis_BackgroundLoop.mp3', 0.1, lambda t: 0, volume=0) # Note: technically a wav with mp3 extension, but just a placeholder

print("Generated sounds.")
