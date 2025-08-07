const generateBtn = document.getElementById("generateBtn")

generateBtn.addEventListener("click", async () => {
    const idea = document.getElementById("topicInput").value.trim();
    const output = document.getElementById("output");
    const spinner = document.getElementById("spinner");

    if (!idea) {
        output.innerHTML = `<span>Please enter your Idea!</span>`
        return
    }
    output.innerHTML = ""
    spinner.style.display = "block"

    try {
        const res = await fetch("https://api.cohere.ai/v1/generate", {
            method: "POST",
            headers: {
                "Authorization": "Bearer REPLACE_WITH_YOUR_KEY",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "command",
                prompt: `You are a branding expert. Return ONLY a short, catchy, one-line startup slogan for: "${idea}". No intro. No extra lines. No explanation. Only the slogan.`,
                max_tokens: 30,
                temperature: 0.7,
            })
        })
        const data = await res.json()
        const raw = data.generations[0].text.trim();
        const cleaned = raw.replace(/(\r\n|\n|\r)/gm, '').replace(/^.*?:/, '').trim();
        output.innerHTML = typeWriterEffect(cleaned)

    } catch (err) {
        output.innerHTML = `<span class="text-danger">Error: ${err.message}</span>`;
    } finally {
        spinner.style.display = "none";
    }
})

function typeWriterEffect(text, index = 0) {
    const output = document.getElementById("output")

    if (index < text.length) {
        output.innerHTML += text.charAt(index);
        setTimeout(() => typeWriterEffect(text, index + 1), 30)
    }
}