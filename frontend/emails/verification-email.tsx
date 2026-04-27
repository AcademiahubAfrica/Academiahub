import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const APP_URL = (
  process.env.NEXTAUTH_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");
const LOGO_URL = `${APP_URL}/assets/images/Logoimage.png`;

interface VerificationEmailProps {
  code: string;
  expiresInMinutes?: number;
}

export function VerificationEmail({
  code,
  expiresInMinutes = 5,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your AcademiaHub verification code is {code}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src={LOGO_URL}
              alt="AcademiaHub"
              width="220"
              style={logo}
            />
            <Text style={subtitle}>Verify your email address</Text>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Thank you for signing up! Please use the verification code below to
              complete your registration:
            </Text>

            <Section style={codeBox}>
              <Text style={codeText}>{code}</Text>
            </Section>

            <Text style={hint}>
              This code will expire in <strong>{expiresInMinutes} minutes</strong>.
            </Text>
            <Text style={hint}>
              If you didn&apos;t create an account with AcademiaHub, you can safely
              ignore this email.
            </Text>
          </Section>

          <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>
              This is an automated message from AcademiaHub. Please do not reply.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default VerificationEmail;

const body: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  backgroundColor: "#f4f4f5",
};

const container: React.CSSProperties = {
  maxWidth: "480px",
  margin: "40px auto",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const header: React.CSSProperties = {
  padding: "40px 40px 20px",
  textAlign: "center",
};

const logo: React.CSSProperties = {
  display: "block",
  margin: "0 auto 10px",
  height: "auto",
};

const subtitle: React.CSSProperties = {
  margin: 0,
  fontSize: "16px",
  color: "#71717a",
};

const content: React.CSSProperties = {
  padding: "20px 40px",
};

const paragraph: React.CSSProperties = {
  margin: "0 0 20px",
  fontSize: "15px",
  color: "#3f3f46",
  lineHeight: 1.6,
};

const codeBox: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center",
  margin: "20px 0",
};

const codeText: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "8px",
  color: "#18181b",
  margin: 0,
};

const hint: React.CSSProperties = {
  margin: "10px 0 0",
  fontSize: "14px",
  color: "#71717a",
  lineHeight: 1.6,
};

const footer: React.CSSProperties = {
  padding: "20px 40px 40px",
};

const divider: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e4e4e7",
  margin: "0 0 20px",
};

const footerText: React.CSSProperties = {
  margin: 0,
  fontSize: "12px",
  color: "#a1a1aa",
  textAlign: "center",
};
