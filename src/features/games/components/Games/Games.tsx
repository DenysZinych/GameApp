import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { fetchGames } from "features/games/api";
import * as Yup from "yup";
import useDebounce from "hooks/useDebounce";
import { selectGames } from "features/games/gamesSlice/gamesSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Input, Loader } from "components";
import { GameCard } from "../GameCard";
import searchIcon from "../../icons/search-icon.svg";
import keyIcon from "../../icons/key-icon.svg";
import logo from "../../icons/logo.png";
import styles from "./Games.module.css";

export const Games = () => {
  const dispatch = useAppDispatch();
  const { value, loading, error } = useAppSelector(selectGames);
  const [isKeyPressed, setKeyPressed] = useState<boolean>(false);
  const games = value?.data?.results;
  const gamesCount = value?.data?.count as number;

  const maxPageCount = useMemo(() => {
    if (gamesCount > 10) {
      return Math.floor(gamesCount / 10);
    }

    return 1;
  }, [gamesCount]);

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      search: "",
      key: "",
      pageNumber: 1,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      key: Yup.string().required("This field is required"),
      pageNumber: Yup.number()
        .min(1, "Value must be greater than or equal to 1")
        .max(
          maxPageCount,
          `Value must be less than or equal to ${maxPageCount}`,
        ),
    }),
    onSubmit: () => {
      const params = {
        key: values.key,
        page_size: 10,
        page: values.pageNumber,
        search: values.search,
      };
      dispatch(fetchGames(params));
    },
  });

  const debouncedSearch = useDebounce<string>(values.search, 1000);
  const debouncedKey = useDebounce<string>(values.key, 1000);
  const debouncedPage = useDebounce<number>(values.pageNumber, 1000);

  useEffect(() => {
    if (!debouncedKey || isKeyPressed) return;
    handleSubmit();
  }, [debouncedSearch, debouncedKey, debouncedPage, handleSubmit]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Enter") {
        setKeyPressed(true);
        handleSubmit();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleSubmit]);

  return (
    <div className={styles.gamesContainer}>
      <img
        src={logo}
        alt="logo"
      />
      <h1 className={styles.header}>Games search</h1>
      <div className={styles.inputsWrapper}>
        <Input
          id="search"
          type="text"
          placeholder="Start searching"
          image={searchIcon}
          value={values.search}
          onChange={(e) => {
            handleChange(e);
            values.pageNumber = 1;
            setKeyPressed(false);
          }}
        />
        <Input
          id="key"
          type="password"
          placeholder="Enter your key"
          image={keyIcon}
          value={values.key}
          onChange={handleChange}
          error={!!errors.key || !!error}
          errorMessage={errors.key || "Something went wrong. Check your key."}
        />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {games?.length && values.key ? (
            <>
              <div className={styles.gamesWrapper}>
                {games?.map(({ id, name, background_image: imageUrl }: any) => (
                  <GameCard
                    key={id}
                    name={name}
                    imageUrl={imageUrl}
                  />
                ))}
              </div>
              <div className={styles.pageNumber}>
                <Input
                  id="pageNumber"
                  label="Page number"
                  type="number"
                  placeholder="Enter page number"
                  value={values.pageNumber}
                  onChange={handleChange}
                  error={!!errors.pageNumber}
                  errorMessage={errors.pageNumber}
                />
              </div>
            </>
          ) : (
            <>
              {gamesCount === 0 ? (
                <h1 className={styles.searchText}>No results found</h1>
              ) : (
                <h1 className={styles.searchText}>
                  Enter your API key to start searching for games.
                  <span className={styles.span}>
                    For more details check{" "}
                    <a
                      href="https://rawg.io/apidocs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      rawg.io.
                    </a>
                  </span>
                </h1>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
