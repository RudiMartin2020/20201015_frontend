<template>
  <section class="baseform">
    <component-panel
      class="lot-search"
      :use-header="false"
    >
      <ul class="search-options sel">
        <li class="option-title">
          구분
        </li>
        <li class="option-item">
          <b-radio name="radio">
            제공현황
          </b-radio>
          <b-radio name="radio">
            입출고내역
          </b-radio>
        </li>
      </ul>
      <ul class="search-options period">
        <li class="option-title">
          조회기간
        </li>
        <li class="option-item">
          <b-datepicker
            placeholder="from"
            icon="calendar-today"
            v-model="from"
            editable
          />
          <span class="unit">~</span>
          <b-datepicker
            placeholder="to"
            icon="calendar-today"
            v-model="to"
            editable
          />
        </li>
        <li class="option-item">
          <b-checkbox>제공이 없는 Material Lot 포함</b-checkbox>
        </li>
      </ul>
      <div class="search-condition">
        <span class="option-title">검색 조건</span>
        <ul class="search-options">
          <li class="option-item">
            <span class="item-label">Poly Code</span>
            <span class="item-input">
              <b-select>
                <option>선택1</option>
              </b-select>
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">Material Code</span>
            <span class="item-input">
              <b-select>
                <option>선택1</option>
              </b-select>
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">Poly Code</span>
            <span class="item-input">
              <b-select>
                <option>선택1</option>
              </b-select>
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">Material Code</span>
            <span class="item-input">
              <b-select>
                <option>선택1</option>
              </b-select>
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">Poly Code</span>
            <span class="item-input">
              <b-select>
                <option>선택1</option>
              </b-select>
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">Material Code</span>
            <span class="item-input">
              <b-select>
                <option>선택1</option>
              </b-select>
            </span>
          </li>
        </ul>
      </div>
      <!-- /.search-options -->
    </component-panel>
    <!-- /.lot-search -->
    <component-panel
      class="data-list-grid"
      :use-header="false"
    >
      <ul class="data-list">
        <li class="data-item">
          <span class="item-label">입고 수량 : </span>
          <span class="item-txt">456,500</span>
        </li>
        <li class="data-item">
          <span class="item-label">Batch 투입 : </span>
          <span class="item-txt">456,500</span>
        </li>
        <li class="data-item">
          <span class="item-label">Batch 외 출고 : </span>
          <span class="item-txt">456,500</span>
        </li>
        <li class="data-item">
          <span class="item-label">재고량 : </span>
          <span class="item-txt">500</span>
        </li>
        <li class="data-item">
          <span class="item-label">단위 : </span>
          <span class="item-txt">500</span>
          <span class="unit">KG</span>
        </li>
      </ul>
    </component-panel>
    <component-panel
      class="grid-wrap add-grid-desc"
    >
      <sk-grid
        ref="lotListGrid"
        style="width: 100%"
        :items-source="lotList"
        :initialized="initLotGrid"
        :use-checkbox="true"
        :columns="lotListColumns"
        @selection-changed="selectionChanged"
      />
      <span
        id="lotListGridDesc"
        class="grid-desc"
      >{{ lotListGridDescData }}</span>
    </component-panel>
  </section>
</template>
<script src="./BaseForm01.script.js" />
<style src="./BaseForm01.scss" lang="scss" />
