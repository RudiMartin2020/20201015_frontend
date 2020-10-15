<template>
  <section class="baseform09">
    <section class="spec-grid-wrap">
      <component-panel 
        class="spec-grid"
        title="RMS Spec"  
      >
        <div class="mode-area">
          <span class="item-label">Mode</span>
          <span class="item-input">
            <b-radio name="radio">입력</b-radio>
            <b-radio name="radio">수정</b-radio>
            <b-radio name="radio">삭제</b-radio>
            <b-radio name="radio">개정</b-radio>
            <b-radio name="radio">승인</b-radio>
            <b-radio name="radio">조회</b-radio>
          </span>
        </div>
        <ul class="search-options">
          <li class="option-item">
            <span class="item-label">Grow Type</span>
            <span class="item-input">
              <b-select>
                <option>선택</option>
              </b-select>
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">MS Code</span>
            <span class="item-input sm">
              <b-input />
              <b-button type="is-dark" icon-left="magnify" />
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">Charge 량(kg)</span>
            <span class="item-input">
              <b-select>
                <option>선택</option>
              </b-select>
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">Rev.</span>
            <span class="item-input sm">
              <b-select>
                <option>선택</option>
              </b-select>
              <b-checkbox>승인</b-checkbox>
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">품질 평가 방법</span>
            <span class="item-input">
              <b-radio name="radio2">INLINE</b-radio>
              <b-radio name="radio2">BLOCK</b-radio>
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">예상 길이(mm)</span>
            <span class="item-input">
              <b-input />
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">Default Sample(mm)</span>
            <span class="item-input">
              <b-input />
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">작업자</span>
            <span class="item-input">
              <b-input />
            </span>
          </li>
        </ul>
      </component-panel>
      <component-panel 
        class="data-tab-grid add-grid-desc"
      >
        <b-tabs>
          <b-tab-item label="품질영역">
            <sk-grid
              ref="lotListGrid"
              style="width: 100%"
              :items-source="lotList"
              :initialized="initLotGrid"
              :columns="lotListColumns"
              @selection-changed="selectionChanged"
            />
            <span class="grid-desc">99건 조회 되었습니다.</span>
          </b-tab-item>
          <b-tab-item label="Crop Position">
          </b-tab-item>
          <b-tab-item label="Sample Position">
          </b-tab-item>
          <b-tab-item label="Slice Spec">
          </b-tab-item>
        </b-tabs>
      </component-panel>
    </section>
    <component-panel
      class="canvas-grid"
      title="Canvas 영역"
    >
    </component-panel>
  </section>
</template>
<script src="./BaseForm09.script.js" />
<style src="./BaseForm09.scss" lang="scss" />
