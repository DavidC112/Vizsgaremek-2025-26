import { useEffect, useRef, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { EllipsisVertical, SquarePen, Trash2 } from "lucide-react";
import { useRecipes } from "../hooks/useRecipes";
import EditRecipeModal from "../components/ProfilePage/EditRecipeModal";

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
          className="absolute top-2 right-2 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100"
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

const ProfilePage = () => {
  const { fetchUser, singleUser } = useUser();
  const { fetchRecipeById, recipeData } = useRecipes();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [isFetchingRecipe, setIsFetchingRecipe] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleEdit = async (id: number) => {
    setModalOpen(true);
    setIsFetchingRecipe(true);
    await fetchRecipeById(id);
    setIsFetchingRecipe(false);
  };

  const handleDelete = (id: number) => {
    console.log("Delete", id);
  };

  return (
    <>
      <main className="max-w-7xl p-6 md:mx-auto">
        <section className="border-b border-neutral-400 pb-5">
          <div className="flex gap-5">
            <img
              src={singleUser?.profilePictureUrl}
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
        </section>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {singleUser?.recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onNavigate={(id) => navigate(`/recipe/${id}`)}
            />
          ))}
        </div>
      </main>

      <EditRecipeModal
        isOpen={modalOpen}
        isLoading={isFetchingRecipe}
        recipe={recipeData ?? null}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchUser}
      />
    </>
  );
};

export default ProfilePage;
