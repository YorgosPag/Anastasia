
import { getAdminDb } from "@/lib/firebase-admin";
import { getCustomLists, getAllCustomListItems } from "@/lib/custom-lists-data";
import { CustomListsManager } from "./client-page";

export default async function CustomListsPage() {
  const db = getAdminDb();
  const [lists, items] = await Promise.all([
    getCustomLists(db),
    getAllCustomListItems(db),
  ]);

  return <CustomListsManager lists={lists} items={items} />;
}
