"use client"

import { useTheme } from "next-themes"

import CurvedInput from "@/components/CurvedInput"
import { contactEmail } from "@/lib/i18n/config"

interface ContactBandProps {
  title: string
  text: string
  placeholder: string
  buttonText: string
  subject: string
}

export function ContactBand({
  title,
  text,
  placeholder,
  buttonText,
  subject,
}: ContactBandProps) {
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme === "dark"

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {text}
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <CurvedInput
          type="email"
          placeholder={placeholder}
          buttonText={buttonText}
          theme={dark ? "dark" : "light"}
          width="100%"
          bend={20}
          height={58}
          cornerRadius={16}
          backgroundColor={dark ? "#141a17" : "#ffffff"}
          textColor={dark ? "#f0f7f3" : "#14201a"}
          placeholderColor={dark ? "#7f9188" : "#9aa8a0"}
          borderColor={dark ? "#2c3a33" : "#cad6cf"}
          buttonColor={dark ? "#e8b84b" : "#10a06f"}
          buttonTextColor={dark ? "#1b1303" : "#ffffff"}
          shadowColor="#000000"
          shadowSize="md"
          onSubmit={(value) => {
            const address = value.trim()
            const body = `I would like to get in touch with the MRVIN100 model.%0D%0A%0D%0AMy email: ${encodeURIComponent(address)}`
            window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
              subject
            )}&body=${body}`
          }}
        />
        <p className="mt-3 text-xs text-muted-foreground/80">
          MRVIN100 · {contactEmail}
        </p>
      </div>
    </div>
  )
}
