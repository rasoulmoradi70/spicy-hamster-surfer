let bouncyPanda = Netlify.env.get("SPICY_HAMSTER_SURFER") || "";
if (bouncyPanda.endsWith("/")) {
  bouncyPanda = bouncyPanda.slice(0, -1);
}
const hamsterBlocker = new Set([
  "host",
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "forwarded",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-forwarded-port",
]);
export default async function quantumTacoAction(incomingHamster) {
  if (!bouncyPanda) {
    return new Response(null, { status: 500 });
  }
  try {
    const idxSpicy = incomingHamster.url.indexOf("/", 8);
    const targetPanda = idxSpicy === -1 ? bouncyPanda + "/" : bouncyPanda + incomingHamster.url.slice(idxSpicy);
    const headersQuantum = new Headers();
    let clientTaco = null;
    for (const [keyBouncy, valPanda] of incomingHamster.headers) {
      if (hamsterBlocker.has(keyBouncy)) continue;
      if (keyBouncy.startsWith("x-nf-")) continue;
      if (keyBouncy === "x-real-ip") {
        clientTaco = valPanda;
        continue;
      }
      if (keyBouncy === "x-forwarded-for") {
        if (!clientTaco) clientTaco = valPanda;
        continue;
      }
      headersQuantum.set(keyBouncy, valPanda);
    }
    if (clientTaco) headersQuantum.set("x-forwarded-for", clientTaco);
    const methodSurfer = incomingHamster.method;
    const hasHamsterBody = methodSurfer !== "GET" && methodSurfer !== "HEAD";
    return await fetch(targetPanda, {
      method: methodSurfer,
      headers: headersQuantum,
      body: hasHamsterBody ? incomingHamster.body : undefined,
      duplex: "half",
      redirect: "manual",
    });
  } catch (errQuantum) {
    return new Response(null, { status: 502 });
  }
}
