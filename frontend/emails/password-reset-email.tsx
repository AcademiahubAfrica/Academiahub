import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const APP_URL = (
  process.env.NEXTAUTH_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");
const LOGO_URL = `${APP_URL}/assets/images/Logoimage.png`;

interface PasswordResetEmailProps {
  resetUrl: string;
}

export function PasswordResetEmail({ resetUrl }: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your AcademiaHub password</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src={LOGO_URL}
              alt="AcademiaHub"
              width="220"
              style={logo}
            />
          </Section>

          <Section style={content}>
            <Text style={heading}>Reset your password</Text>
            <Text style={paragraph}>
              We received a request to reset your password. Click the button
              below to create a new password.
            </Text>

            <Section style={buttonWrap}>
              <Button href={resetUrl} style={button}>
                Reset Password
              </Button>
            </Section>

            <Text style={hint}>
              If you didn&apos;t request a password reset, you can safely
              ignore this email.
            </Text>

            <Text style={hint}>
              If the button doesn&apos;t work, copy and paste this link into
              your browser:
              <br />
              <Link href={resetUrl} style={fallbackLink}>
                {resetUrl}
              </Link>
            </Text>
          </Section>

          <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>
              Need help? Contact us at{" "}
              <Link
                href="mailto:support@mail.academiahubafrica.org"
                style={footerLink}
              >
                support@mail.academiahubafrica.org
              </Link>
            </Text>
            <Text style={copyright}>
              © 2026 Academia Hub Africa. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default PasswordResetEmail;

const body: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  backgroundColor: "#f4f4f5",
};

const container: React.CSSProperties = {
  maxWidth: "560px",
  margin: "40px auto",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const header: React.CSSProperties = {
  padding: "40px 40px 16px",
  textAlign: "center",
};

const logo: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  height: "auto",
};

const content: React.CSSProperties = {
  padding: "16px 40px",
  textAlign: "center",
};

const heading: React.CSSProperties = {
  margin: "20px 0 12px",
  fontSize: "26px",
  fontWeight: 700,
  color: "#18181b",
};

const paragraph: React.CSSProperties = {
  margin: "0 0 28px",
  fontSize: "15px",
  color: "#52525b",
  lineHeight: 1.6,
};

const buttonWrap: React.CSSProperties = {
  margin: "12px 0 32px",
  textAlign: "center",
};

const button: React.CSSProperties = {
  backgroundColor: "#1e3a8a",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 600,
  textDecoration: "none",
  padding: "14px 36px",
  borderRadius: "10px",
  display: "inline-block",
};

const hint: React.CSSProperties = {
  margin: "16px 0",
  fontSize: "14px",
  color: "#3f3f46",
  lineHeight: 1.6,
};

const fallbackLink: React.CSSProperties = {
  color: "#1e3a8a",
  wordBreak: "break-all",
};

const footer: React.CSSProperties = {
  padding: "20px 40px 40px",
  textAlign: "center",
};

const divider: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e4e4e7",
  margin: "0 0 20px",
};

const footerText: React.CSSProperties = {
  margin: "4px 0",
  fontSize: "13px",
  color: "#52525b",
};

const footerLink: React.CSSProperties = {
  color: "#1e3a8a",
  textDecoration: "underline",
};

const copyright: React.CSSProperties = {
  margin: "20px 0 0",
  fontSize: "12px",
  color: "#a1a1aa",
};
