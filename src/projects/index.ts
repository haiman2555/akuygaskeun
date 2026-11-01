/**
 * Daftar project. Tiap project otomatis jadi komposisi Remotion
 * dengan id = edit.id (render: npx remotion render <id>).
 */
import type { Edit } from "../schema/edit";
import { edit as contoh } from "./contoh/edit";

export const PROJECTS: Edit[] = [contoh];
