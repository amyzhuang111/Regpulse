import { getElevenLabsClient } from "@/lib/elevenlabs";

export async function transcribeAudio(file: Blob): Promise<string> {
  const client = getElevenLabsClient();

  const result = await client.speechToText.convert({
    file,
    model_id: "scribe_v1",
    language_code: "eng",
    diarize: true,
  });

  return result.text;
}
