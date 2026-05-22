import { useEffect } from "react";

const SITE_NAME = "Xiong Zhi Lim";

export function useTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} | ${SITE_NAME}` : SITE_NAME;
  }, [page]);
}
