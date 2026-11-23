import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text/Text';
import { clsx } from 'clsx';
import { useState, useRef } from 'react';
import {
  defaultArticleState,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  type ArticleStateType,
  fontFamilyOptions,
  fontColors,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import type { Dispatch, SetStateAction } from 'react';

import styles from './ArticleParamsForm.module.scss';

type IArticleParamsForm = {
  onSubmit: Dispatch<SetStateAction<ArticleStateType>>;
  articleState: ArticleStateType;
};

export const ArticleParamsForm = ({
  onSubmit,
  articleState,
}: IArticleParamsForm): React.JSX.Element => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(articleState);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useOutsideClickClose({
    isOpen: isFormOpen,
    rootRef,
    onChange: setIsFormOpen,
  });

  const toggleForm = (): void => {
    setIsFormOpen((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(formState);
  };

  const handleReset = (e: React.FormEvent): void => {
    e.preventDefault();
    setFormState(defaultArticleState);
    onSubmit(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isFormOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text size={31} as={'h2'} weight={800} uppercase={true}>
            Задайте параметры
          </Text>
          <Select
            title={'шрифт'}
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={(selected) =>
              setFormState({ ...formState, fontFamilyOption: selected })
            }
          />
          <RadioGroup
            title={'размер шрифта'}
            name={'fontSize'}
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(selected) =>
              setFormState({ ...formState, fontSizeOption: selected })
            }
          />
          <Select
            title={'цвет шрифта'}
            options={fontColors}
            selected={formState.fontColor}
            onChange={(selected) => setFormState({ ...formState, fontColor: selected })}
          />
          <Separator />
          <Select
            title={'цвет фона'}
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={(selected) =>
              setFormState({ ...formState, backgroundColor: selected })
            }
          />
          <Select
            title={'ширина контента'}
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={(selected) =>
              setFormState({ ...formState, contentWidth: selected })
            }
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
