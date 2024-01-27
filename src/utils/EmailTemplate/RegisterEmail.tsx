import * as React from "react";
import { Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";

type props = {
    username: string;
    VerifyLink: string;
    type?: string;
};
export default function RegisterEmail(props: props) {
    const { username, VerifyLink, type } = props;
    return (
        <Html>
            <Head />
            <Preview>{type == "VERIFY_USER" ? "Welcome to AnimeTrix " : "Lets recover your lost password"}</Preview>
            <Tailwind>
                <Body className="dark:bg-black dark:text-white text-black bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid dark:border-[#eaeaea] border-black/50 rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px]">
                            <Img src={"https://cdn.discordapp.com/attachments/1079039236302446705/1163953174089048184/logo.png?ex=654172dd&is=652efddd&hm=002f781e11eadba44309bf011d463ef4810326d8206e1ec8388bbe41f03c505d&"} width="100" height="100" alt="AnimeTrix" className="my-0 mx-auto" />
                        </Section>
                        <Heading className="dark:text-white text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">{type == "VERIFY_USER" ? `Welcome to AnimeTrix` : "Password Recovery"}</Heading>
                        <Text className="dark:text-white text-black text-[14px] leading-[24px]">
                            Hello <strong>{username}</strong>,
                        </Text>
                        <Text className="dark:text-white text-black text-[14px] leading-[24px]">{type == "VERIFY_USER" ? "Welcome to Animetrix, your ultimate destination for all things anime! We are thrilled to have you on board and excited to bring you a world of endless anime adventures. Whether you're a seasoned anime enthusiast or just starting your journey, Animetrix is here to satisfy your cravings for top-notch anime content." : "We hope this email finds you in good spirits! It seems like your password needs a little TLC, so we’ve set up a magic button just for you"}</Text>
                        <Text className="dark:text-white text-black text-[14px] leading-[24px]">{type == "VERIFY_USER" ? " To get started and unlock the full potential of Animetrix, we need you to confirm your email address. Please click on the button below to verify your email and complete the registration process:" : "Remember, this link is as secret as the recipe for grandma’s famous cookies, so please guard it like a dragon guards its treasure! 🐉🔐 We trust you to keep it under wraps and not share it with anyone, not even your cat (unless your cat happens to be a cybersecurity expert, in which case, we might reconsider). Please click on the button below to reset your password:"}</Text>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button pX={20} pY={12} className=" bg-blue-600 rounded text-white text-[12px] font-semibold no-underline text-center" href={VerifyLink}>
                                {type == "VERIFY_USER" ? "Verify Email" : "Reset Password"}
                            </Button>
                        </Section>
                        <Text className="dark:text-white text-black text-[14px] leading-[24px]">
                            or copy and paste this URL into your browser:{" "}
                            <Link href={VerifyLink} className="text-purple-600 no-underline">
                                {VerifyLink}
                            </Link>
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
