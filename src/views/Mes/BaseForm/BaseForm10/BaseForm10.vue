<template>
  <section class="baseform10">
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
            <span class="item-label">예상 길이(mm)</span>
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
        class="data-tab-grid"
      >
        <b-tabs>
          <b-tab-item label="Prime S/E 정의">
            <sk-chart
              :items-source="chartData"
              binding-x-type="NUMBER"
              binding-x="order"
              chart-type="Line"
            >
              <wj-flex-chart-series
                binding="value"
                name="SeriesName"
              />
            </sk-chart>
          </b-tab-item>
          <b-tab-item label="품질 영역">
          </b-tab-item>
          <b-tab-item label="Reject MS Crop">
          </b-tab-item>
          <b-tab-item label="Sample Position">
          </b-tab-item>
          <b-tab-item label="Sample Usage">
          </b-tab-item>
        </b-tabs>
      </component-panel>
    </section>
    <component-panel
      class="data-grid-wrap"
      :use-header="false"
    >
      <component-panel
        class="chart-wrap"
      >
        <sk-chart
          :items-source="chartData"
          binding-x-type="NUMBER"
          binding-x="order"
          chart-type="Line"
        >
          <wj-flex-chart-series
            binding="value"
            name="SeriesName"
          />
        </sk-chart>
      </component-panel>
      <component-panel
        class="grid-wrap add-grid-desc"
      >
        <sk-grid
          ref="lotListGrid"
          style="width: 100%"
          :items-source="lotList"
          :initialized="initLotGrid"
          :columns="lotListColumns"
          @selection-changed="selectionChanged"
        />
        <span class="grid-desc">99건 조회 되었습니다.</span>
      </component-panel>
    </component-panel>
  </section>
</template>
<script src="./BaseForm10.script.js" />
<style src="./BaseForm10.scss" lang="scss" />
