function stringToHex(inputString) {
  if (typeof inputString !== "string") {
    return "";
  }

  const buffer = Buffer.from(inputString, "utf-8");

  const hexString = buffer.toString("hex");

  return hexString;
}

const hash = "QmcWBAYBuTm2idUMxSVE6ppfiAwwihCpzwd5RDfdQMx17c";
const hexRepresentation = stringToHex(hash);
console.log(hexRepresentation);
