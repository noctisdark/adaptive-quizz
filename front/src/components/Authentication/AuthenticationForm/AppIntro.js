import styled from "@emotion/styled";
import { Box, Text } from "@chakra-ui/react";

const Logo = styled.img`
  margin: 0 auto;
  max-width: min(70%, 400px);
`;

const AppIntro = () => (
  <Box maxWidth={600}>
    <Logo src="/logo.svg" alt="Apdative Quiz's logo" />
    <div>
      <Text>
        <strong>Adaptive Quiz</strong> is a web application that helps teachers
        design adaptive quizzes on a given subject, the questions presented to
        students can evolve according to the answers given during the assesment.
      </Text>
    </div>
  </Box>
);

export default AppIntro;
