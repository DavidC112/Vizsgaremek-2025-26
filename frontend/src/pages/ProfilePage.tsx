import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EllipsisVertical, SquarePen, Trash2, Pencil } from "lucide-react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import EditRecipeModal from "../components/ProfilePage/EditRecipeModal";
import EditProfileModal from "../components/ProfilePage/EditProfileModal";
import { useUserContext } from "../context/UserContext";
import { useRecipes } from "../hooks/useRecipes";
import { useNotification } from "../context/NotificationProvider";

const RecipeCard = ({
  recipe,
  onEdit,
  onDelete,
  onNavigate,
}: {
  recipe: { id: number; name: string; imageUrl?: string };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onNavigate: (id: number) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [menuOpen]);

  return (
    <div className="group cursor-pointer" onClick={() => onNavigate(recipe.id)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
        <img
          src={recipe.imageUrl ?? ""}
          alt={recipe.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          ref={menuRef}
          className="absolute top-2 right-2 opacity-100 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="flex items-center justify-center rounded-full bg-black/60 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/80"
            aria-label="Recipe options"
          >
            <EllipsisVertical className="size-4" />
          </button>
          {menuOpen && (
            <div className="absolute top-9 right-0 z-10 min-w-32 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(recipe.id);
                }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 transition hover:bg-neutral-50"
              >
                <SquarePen className="size-4" /> Edit
              </button>
              <div className="h-px bg-neutral-100" />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(recipe.id);
                }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
              >
                <Trash2 className="size-4" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 px-1">
        <h3 className="line-clamp-2 text-sm leading-snug font-medium text-neutral-900">
          {recipe.name}
        </h3>
      </div>
    </div>
  );
};

const DeleteRecipeDialog = ({
  recipeName,
  isOpen,
  isDeleting,
  onConfirm,
  onCancel,
}: {
  recipeName: string;
  isOpen: boolean;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <Dialog open={isOpen} onClose={onCancel} className="relative z-50">
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm"
      aria-hidden="true"
    />
    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
      <DialogPanel className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
        <DialogTitle className="text-lg font-bold text-neutral-900">
          Delete recipe?
        </DialogTitle>
        <p className="mt-2 text-sm text-neutral-500">
          <span className="font-medium text-neutral-700">{recipeName}</span>{" "}
          will be permanently deleted. This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-full border border-neutral-300 px-5 py-1.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-full bg-red-500 px-5 py-1.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
);

const ProfilePage = () => {
  const { singleUser, fetchUser, deleteUserRecipe } = useUserContext();
  const { fetchRecipeById, recipeData } = useRecipes();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [isFetchingRecipe, setIsFetchingRecipe] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const [pendingDelete, setPendingDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleEdit = async (id: number) => {
    setModalOpen(true);
    setIsFetchingRecipe(true);
    await fetchRecipeById(id);
    setIsFetchingRecipe(false);
  };

  const handleDeleteRequest = (id: number) => {
    const recipe = singleUser?.recipes.find((r) => r.id === id);
    setPendingDelete({ id, name: recipe?.name ?? "This recipe" });
  };

  const handleDeleteConfirm = async () => {
    if (!pendingDelete) return;
    setIsDeleting(true);
    const res = await deleteUserRecipe(pendingDelete.id);
    setIsDeleting(false);
    setPendingDelete(null);
    addNotification(
      res ? "Recipe deleted successfully" : "Failed to delete recipe",
      res ? "success" : "error",
    );
  };

  return (
    <>
      <main className="w-full max-w-7xl p-6 md:mx-auto">
        <section className="border-b border-neutral-400 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <img
                src={singleUser?.profilePictureUrl || "/default-avatar.png"}
                alt=""
                className="size-20 rounded-full object-cover"
              />
              <div className="my-auto flex flex-col">
                <h1 className="text-xl font-semibold">
                  {`${singleUser?.firstName} ${singleUser?.lastName}`}
                </h1>
                <p className="text-sm text-neutral-500">{singleUser?.email}</p>
              </div>
            </div>
            <button
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-1.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50"
            >
              <Pencil className="size-4" /> Edit profile
            </button>
          </div>
        </section>

        <div className="mt-6">
          {singleUser?.recipes && singleUser.recipes.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {singleUser.recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onEdit={handleEdit}
                  onDelete={handleDeleteRequest}
                  onNavigate={(id) => navigate(`/recipe/${id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-12">
              <p className="text-sm text-neutral-500">No recipes yet</p>
              <p className="mt-1 text-xs text-neutral-400 underline transition-colors hover:text-neutral-500">
                <Link to="/recipe/add">Create your first recipe</Link>
              </p>
            </div>
          )}
        </div>
      </main>

      <DeleteRecipeDialog
        recipeName={pendingDelete?.name ?? ""}
        isOpen={!!pendingDelete}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setPendingDelete(null)}
      />

      <EditRecipeModal
        isOpen={modalOpen}
        isLoading={isFetchingRecipe}
        recipe={recipeData ?? null}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchUser}
      />

      {singleUser && (
        <EditProfileModal
          isOpen={profileModalOpen}
          user={singleUser}
          onClose={() => setProfileModalOpen(false)}
          onSuccess={() => setProfileModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProfilePage;
