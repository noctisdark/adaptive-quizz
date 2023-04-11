import { createStandaloneToast } from "@chakra-ui/react";

import theme from "./UIProvider/theme";

const { ToastContainer, toast } = createStandaloneToast({ theme });

export { ToastContainer, toast };