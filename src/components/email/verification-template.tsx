import * as React from 'react';

interface VerificationEmailTemplateProps {
    confirmLink: string;
    heading: string;
    content: string;
}

import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Tailwind,
    Text,
  } from "@react-email/components";
import Link from 'next/link';

export const VerificationEmailTemplate: React.FC<Readonly<VerificationEmailTemplateProps>> = ({
    confirmLink,
    heading,
    content,
}) => (
    <Html>
  <Head />
  <Preview>Hello</Preview>
  <Tailwind>
    <Body className="bg-whi
    te my-auto font-sans">
        <Container className="
            my-[40px] p-[20px] w-[465px] flex flex-col justify-center items-center">
            <Heading>{heading}</Heading>
            <Text className="mx-auto font-thin">{content}</Text>
                <a href={confirmLink}>
                Confirm Your Email
                </a>

        </Container>
    </Body>
  </Tailwind>
</Html>
    
);
