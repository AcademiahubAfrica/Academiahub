import { Request, Response, NextFunction } from "express";

export function docsAuth(req: Request, res: Response, next: NextFunction): void {
  const user = process.env.DOCS_USER;
  const pass = process.env.DOCS_PASS;

  if (!user || !pass) {
    res.status(503).json({ error: "Docs not available" });
    return;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", 'Basic realm="AcademiaHub Docs"');
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const base64 = authHeader.slice(6);
  const decoded = Buffer.from(base64, "base64").toString("utf8");
  const [providedUser, ...passParts] = decoded.split(":");
  const providedPass = passParts.join(":");

  if (providedUser !== user || providedPass !== pass) {
    res.setHeader("WWW-Authenticate", 'Basic realm="AcademiaHub Docs"');
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  next();
}
