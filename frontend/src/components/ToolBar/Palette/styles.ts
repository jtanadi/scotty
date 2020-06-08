import styled, { css, FlattenSimpleInterpolation } from "styled-components"

import { Cover, P, Input, COLORS } from "../../globalStyles"

export const Container = styled.div`
  width: calc(11rem + 1.25rem);
  height: 5.25rem;
  position: absolute;
  top: calc(-5.25rem / 2 + 2.25rem / 2);
  right: 1.8rem;
  transition: opacity ease 0.25s;
  z-index: 99;
`

export const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 1.25rem solid ${COLORS.LIGHT_GRAY};
  border-top: 0.8125rem solid transparent;
  border-bottom: 0.8125rem solid transparent;
  position: absolute;
  top: calc(5.25rem / 2 - 0.8125rem);
  right: 0;
`

export const InnerContainer = styled.div`
  box-sizing: border-box;
  width: 11.25rem;
  height: 100%;
  padding: 0.75rem;
  background-color: ${COLORS.LIGHT_GRAY};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`

type ColorProps = {
  color: string
  selected: boolean
}

export const Color = styled.button<ColorProps>`
  box-sizing: border-box;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  background-color: ${(props): string => props.color};
  border: 0;
  border-radius: 1.25rem;
  flex: 1 1 1.5rem;

  &:nth-child(5) {
    margin-right: 0;
  }

  &:hover {
    box-shadow: 0 0 0.35rem ${(props): string => props.color};
  }

  ${(props): FlattenSimpleInterpolation =>
    props.selected &&
    css`
      border: 2px solid ${COLORS.SPACE_GRAY};
    `}
`

export const InputDiv = styled.div`
  height: 1.5rem;
  display: flex;
  flex: 3 3 calc(3 * 1.5rem + 2 * 0.5rem);
`

export const HashDiv = styled.div`
  width: 1rem;
  height: 100%;
  color: ${COLORS.DARK_GRAY};
  background-color: ${COLORS.MID_GRAY};
  display: flex;
`

export const Hash = styled(P)`
  margin: auto;
  color: ${COLORS.DARK_GRAY};
  font-weight: 700;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`

type ColorInputProps = {
  presetColorUsed: boolean
}

export const ColorInput = styled(Input)<ColorInputProps>`
  width: calc(100% - 1rem);

  ${(props): FlattenSimpleInterpolation =>
    !props.presetColorUsed &&
    css`
      font-weight: 600;
      border: 2px solid ${COLORS.SPACE_GRAY};
    `}
`

export const PaletteCover = styled(Cover)`
  background-color: rgba(0, 0, 0, 0);
`
